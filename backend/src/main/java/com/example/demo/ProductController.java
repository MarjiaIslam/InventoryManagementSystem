package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") 
public class ProductController {

    @Autowired
    private ProductRepository repository;

    // GET ALL
    @GetMapping
    public List<Product> getAll() {
        return repository.findAll();
    }

    // GET ONE
    @GetMapping("/{id}")
    public Product getOne(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }

    // POST (Create)
    @PostMapping
    public Product create(@RequestBody Product product) {
        return repository.save(product);
    }

    // PUT (Update Full)
    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product details) {
        Product p = repository.findById(id).orElseThrow();
        p.setName(details.getName());
        p.setCategory(details.getCategory());
        p.setQuantity(details.getQuantity());
        p.setPrice(details.getPrice());
        return repository.save(p);
    }

    // PATCH (Partial Update)
    @PatchMapping("/{id}")
    public Product patch(@PathVariable Long id, @RequestBody Product details) {
        Product p = repository.findById(id).orElseThrow();
        if(details.getName() != null) p.setName(details.getName());
        if(details.getCategory() != null) p.setCategory(details.getCategory());
        if(details.getQuantity() != null) p.setQuantity(details.getQuantity());
        if(details.getPrice() != null) p.setPrice(details.getPrice());
        return repository.save(p);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}