package com.unique.controller;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.draw.LineSeparator;
import com.unique.exception.ResourceNotFoundException;
import com.unique.model.Account;
import com.unique.model.AccountOrder;
import com.unique.model.ProductOrder;
import com.unique.repository.AccountOrderRepository;
import com.unique.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@RestController
@CrossOrigin(origins = "*")
public class AccountOrderController {
    private AccountOrderRepository accountOrderRepository;
    private AccountRepository accountRepository;

    @Autowired
    public AccountOrderController(AccountOrderRepository accountOrderRepository, AccountRepository accountRepository) {
        this.accountOrderRepository = accountOrderRepository;
        this.accountRepository = accountRepository;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @GetMapping("/account-orders/pageable")
    public Page<AccountOrder> getAllAccountOrders(@RequestParam(name = "page", defaultValue = "0") String pageParam,
                                                  @RequestParam(name = "size", defaultValue = "5") String sizeParam) {
        int page = Integer.parseInt(pageParam);
        int size = Integer.parseInt(sizeParam);
        Pageable pageable = PageRequest.of(page, size, Sort.by("dateCreated").descending());
        return this.accountOrderRepository.findAll(pageable);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'CUSTOMER')")
    @GetMapping("/account-orders/{id}")
    public ResponseEntity<AccountOrder> getAccountOrderById(@PathVariable long id) throws ResourceNotFoundException {
        AccountOrder accountOrder = this.accountOrderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found for this id: " + id));
        return ResponseEntity.ok().body(accountOrder);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'CUSTOMER')")
    @GetMapping("/account-orders/findByAccountId")
    public Page<AccountOrder> getAccountOrdersByAccountId(@RequestParam("page") String pageParam,
                                                          @RequestParam("size") String sizeParam,
                                                          @RequestParam("id") long id) {
        int page = Integer.parseInt(pageParam);
        int size = Integer.parseInt(sizeParam);
        Pageable pageable = PageRequest.of(page, size, Sort.by("dateCreated").descending());
        Page<AccountOrder> accountOrders = this.accountOrderRepository.findByAccountId(id, pageable);
        return accountOrders;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'CUSTOMER')")
    @GetMapping("/account-orders/search/findByEmail")
    public Page<AccountOrder> getAccountOrdersByAccountEmail(@RequestParam("page") String pageParam,
                                                            @RequestParam("size") String sizeParam,
                                                            @RequestParam("email") String email) {
        int page = Integer.parseInt(pageParam);
        int size = Integer.parseInt(sizeParam);
        Pageable pageable = PageRequest.of(page, size, Sort.by("dateCreated").descending());
        Page<AccountOrder> accountOrders = this.accountOrderRepository.findByAccount_Email(email, pageable);
        return accountOrders;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @GetMapping("/account-orders/stats")
    public List<Long> getAccountOrderStats() {
        long orderCount;
        long orderDeliveredCount = 0;
        long orderReturnCount = 0;
        List<AccountOrder> orders = this.accountOrderRepository.findAll();
        orderCount = orders.size();
        for (AccountOrder accountOrder : orders) {
            if (accountOrder.getStatus().equals("DELIVERED")) {
                orderDeliveredCount++;
            } else if (accountOrder.getStatus().equals("RETURN")) {
                orderReturnCount++;
            }
        }
        List<Long> result = new ArrayList<>();
        result.add(orderCount);
        result.add(orderDeliveredCount);
        result.add(orderReturnCount);
        return result;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'CUSTOMER')")
    @PostMapping("/account-orders")
    public AccountOrder addAccountOrder(@Valid @RequestBody AccountOrder accountOrder) {
        return this.accountOrderRepository.save(accountOrder);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @PutMapping("/account-orders/{id}")
    public ResponseEntity<AccountOrder> updateAccountOrder(@PathVariable(value = "id") long id,
                                                           @Valid @RequestBody String statusUpdate) throws ResourceNotFoundException {
        AccountOrder accountOrder = this.accountOrderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found for this id: " + id));
        accountOrder.setStatus(statusUpdate);
        return ResponseEntity.ok(this.accountOrderRepository.save(accountOrder));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @PutMapping("/account-orders/by-staff")
    public ResponseEntity<AccountOrder> updateByStaff(@RequestParam("orderId") String orderParam,
                                                      @RequestParam("staffEmail") String staffParam,
                                                      @Valid @RequestBody String statusUpdate) throws ResourceNotFoundException {
        long orderId = Long.parseLong(orderParam);
        AccountOrder order = this.accountOrderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found for this id: " + orderId));
        order.setStatus(statusUpdate);
        order.setStaffEdit(staffParam);
        Account staff = this.accountRepository.findByEmail(staffParam);
        staff.setOrderWork(staff.getOrderWork() + 1);
        this.accountRepository.save(staff);
        return ResponseEntity.ok(this.accountOrderRepository.save(order));
    }

    @GetMapping(value = "/account-orders/print/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> getInvoice(@PathVariable long id) throws IOException, ResourceNotFoundException {
        AccountOrder accountOrder = this.accountOrderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found for this id: " + id));
        ByteArrayInputStream bis = generatePDF(accountOrder);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=invoice.pdf");
        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(new InputStreamResource(bis));
    }

    private ByteArrayInputStream generatePDF(AccountOrder accountOrder) {
        List<ProductOrder> productOrders = accountOrder.getProductOrders();
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try {
            PdfWriter.getInstance(document, out);
            document.open();
            // add text to pdf

            // register fonts
            FontFactory.register(Thread.currentThread().getContextClassLoader().getResource("Montserrat-Regular.ttf").toString(), "main_font");
            FontFactory.register(Thread.currentThread().getContextClassLoader().getResource("Montserrat-Bold.ttf").toString(), "bold_font");
            Font mainFont = FontFactory.getFont("main_font");
            Font boldFont = FontFactory.getFont("bold_font", 24);
            Paragraph p1 = new Paragraph("UNIQUE FASHION", boldFont);
            p1.setIndentationLeft(50);
            Paragraph p2 = new Paragraph("12345 Lost Street Ho Chi Minh City\n" + "uniquefashion.com\n", mainFont);
            p2.setIndentationLeft(50);
            document.add(p1);
            document.add(p2);
            document.add(Chunk.NEWLINE);
            Paragraph p3 = new Paragraph(
                    "Hoa don cho don hang " + accountOrder.getId() + "\n" +
                            "Khach hang "+ stripSign(accountOrder.getName()) + "\n" +
                            "Email "+ accountOrder.getEmail() + "\n" +
                            "SDT "+ accountOrder.getPhone() + "\n" +
                            "Dia chi "+ accountOrder.getAddress(), mainFont);
            p3.setIndentationLeft(50);
            document.add(p3);
            document.add(Chunk.NEWLINE);
            // add table to pdf
            PdfPTable table = new PdfPTable(5);
            Stream.of("Tên hang", "Mau sac", "Kich co", "So luong", "Gia tien").forEach(headerTitle -> {
                PdfPCell header = new PdfPCell();
                header.setPaddingTop(8);
                header.setPaddingBottom(8);
                header.setHorizontalAlignment(Element.ALIGN_CENTER);
                header.setPhrase(new Phrase(headerTitle, mainFont));
                table.addCell(header);
            });
            // each row add product order
            for (ProductOrder productOrder : productOrders) {
                // add name
                PdfPCell nameCell = new PdfPCell(new Phrase(stripSign(productOrder.getName()), mainFont));
                nameCell.setPaddingTop(8);
                nameCell.setPaddingBottom(8);
                nameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                nameCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                table.addCell(nameCell);
                // add color
                PdfPCell colorCell = new PdfPCell(new Phrase(stripSign(productOrder.getColor()), mainFont));
                colorCell.setPaddingTop(8);
                colorCell.setPaddingBottom(8);
                colorCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                colorCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(colorCell);
                // add size
                PdfPCell sizeCell = new PdfPCell(new Phrase(productOrder.getSize(), mainFont));
                sizeCell.setPaddingTop(8);
                sizeCell.setPaddingBottom(8);
                sizeCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                sizeCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(sizeCell);
                // add quantity
                PdfPCell quantityCell = new PdfPCell(new Phrase(String.valueOf(productOrder.getQuantity()), mainFont));
                quantityCell.setPaddingTop(8);
                quantityCell.setPaddingBottom(8);
                quantityCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                quantityCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(quantityCell);
                // add unit price
                PdfPCell priceCell = new PdfPCell(new Phrase(productOrder.getUnitPrice().toString(), mainFont));
                priceCell.setPaddingTop(8);
                priceCell.setPaddingBottom(8);
                priceCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                priceCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(priceCell);
            }
            document.add(table);
            document.add(Chunk.NEWLINE);
            Paragraph p4 = new Paragraph
                    ("Tong cong " + accountOrder.getTotalPrice().toString() + "\n\n" +
                    "--------------------------------------------------------------------------------------------", mainFont);
            p4.setIndentationLeft(50);
            document.add(p4);
            document.add(Chunk.NEWLINE);
            Paragraph p5 = new Paragraph("Cam on quy khach da mua sam tai shop Unique Fashion", mainFont);
            p5.setAlignment(Element.ALIGN_CENTER);
            document.add(p5);
            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        return new ByteArrayInputStream(out.toByteArray());
    }

    private static String stripSign(String vnmese) {
        String str = Normalizer.normalize(vnmese, Normalizer.Form.NFD);
        str = str.replaceAll("\\p{M}", "");
        return str;
    }
}
