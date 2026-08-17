package com.shrishyam.properties.controller;

import com.shrishyam.properties.entity.LeadEntity;
import com.shrishyam.properties.repository.LeadRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH, RequestMethod.OPTIONS})
public class LeadController {

    private final LeadRepository leadRepository;

    public LeadController(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    @GetMapping
    public ResponseEntity<List<LeadEntity>> getAllLeads() {
        return ResponseEntity.ok(leadRepository.findAllByOrderByCreatedAtDesc());
    }

    @PostMapping
    public ResponseEntity<LeadEntity> submitLead(@RequestBody LeadEntity lead) {
        return ResponseEntity.ok(leadRepository.save(lead));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<LeadEntity> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return leadRepository.findById(id).map(l -> {
            l.setStatus(status);
            return ResponseEntity.ok(leadRepository.save(l));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLead(@PathVariable Long id) {
        leadRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
