package com.shrishyam.properties.controller;

import com.shrishyam.properties.entity.PropertyEntity;
import com.shrishyam.properties.repository.PropertyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH, RequestMethod.OPTIONS})
public class PropertyController {

    private final PropertyRepository propertyRepository;

    public PropertyController(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    @GetMapping
    public ResponseEntity<List<PropertyEntity>> getAllProperties(@RequestParam(required = false, defaultValue = "false") boolean all) {
        if (all) {
            return ResponseEntity.ok(propertyRepository.findAll());
        }
        return ResponseEntity.ok(propertyRepository.findByPublishedTrue());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<PropertyEntity>> getFeaturedProperties() {
        return ResponseEntity.ok(propertyRepository.findByFeaturedTrueAndPublishedTrue());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyEntity> getPropertyById(@PathVariable Long id) {
        return propertyRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<PropertyEntity> getPropertyBySlug(@PathVariable String slug) {
        return propertyRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<PropertyEntity>> searchProperties(
            @RequestParam(required = false) String purpose,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String sector) {
        return ResponseEntity.ok(propertyRepository.searchProperties(purpose, type, sector));
    }

    @PostMapping
    public ResponseEntity<PropertyEntity> createProperty(@RequestBody PropertyEntity property) {
        property.setId(null);
        if (property.getTitle() == null || property.getTitle().trim().isEmpty()) {
            property.setTitle("Dwarka Property Listing");
        }
        if (property.getSlug() == null || property.getSlug().trim().isEmpty()) {
            String cleanSlug = property.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
            property.setSlug(cleanSlug + "-" + System.currentTimeMillis());
        }
        if (property.getPropertyType() == null || property.getPropertyType().trim().isEmpty()) {
            property.setPropertyType("Builder Floor");
        }
        if (property.getPurpose() == null || property.getPurpose().trim().isEmpty()) {
            property.setPurpose("Buy");
        }
        if (property.getPriceDisplay() == null) {
            property.setPriceDisplay("₹ Call for Price");
        }
        if (property.getPriceValue() == null) {
            property.setPriceValue(java.math.BigDecimal.ZERO);
        }
        if (property.getLocation() == null) {
            property.setLocation("Dwarka, New Delhi");
        }
        if (property.getSector() == null) {
            property.setSector("Dwarka");
        }
        if (property.getPublished() == null) {
            property.setPublished(true);
        }
        if (property.getCreatedAt() == null) {
            property.setCreatedAt(java.time.LocalDateTime.now());
        }
        return ResponseEntity.ok(propertyRepository.save(property));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PropertyEntity> updateProperty(@PathVariable Long id, @RequestBody PropertyEntity details) {
        return propertyRepository.findById(id).map(p -> {
            p.setTitle(details.getTitle());
            p.setPurpose(details.getPurpose());
            p.setPropertyType(details.getPropertyType());
            p.setPriceDisplay(details.getPriceDisplay());
            p.setPriceValue(details.getPriceValue());
            p.setLocation(details.getLocation());
            p.setSector(details.getSector());
            p.setBhk(details.getBhk());
            p.setBathrooms(details.getBathrooms());
            p.setAreaSqFt(details.getAreaSqFt());
            p.setCarpetAreaSqFt(details.getCarpetAreaSqFt());
            p.setFloor(details.getFloor());
            p.setTotalFloors(details.getTotalFloors());
            p.setParking(details.getParking());
            p.setFurnishing(details.getFurnishing());
            p.setFacing(details.getFacing());
            p.setPropertyAge(details.getPropertyAge());
            p.setAvailability(details.getAvailability());
            p.setFeatured(details.getFeatured());
            p.setPublished(details.getPublished());
            p.setHeroImage(details.getHeroImage());
            p.setImages(details.getImages());
            p.setDescription(details.getDescription());
            p.setContactNumber(details.getContactNumber());
            return ResponseEntity.ok(propertyRepository.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        propertyRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
