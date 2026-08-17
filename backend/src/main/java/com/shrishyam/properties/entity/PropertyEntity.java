package com.shrishyam.properties.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "properties")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PropertyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String purpose;

    @Column(name = "property_type", nullable = false)
    private String propertyType;

    @Column(name = "price_display", nullable = false)
    private String priceDisplay;

    @Column(name = "price_value", nullable = false)
    private BigDecimal priceValue;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String sector;

    private Integer bhk;
    private Integer bathrooms;
    private Integer areaSqFt;
    private Integer carpetAreaSqFt;
    private String floor;
    private Integer totalFloors;
    private String parking;
    private String furnishing;
    private String facing;
    private String propertyAge;
    private String availability;

    @Builder.Default
    private Boolean featured = false;
    @Builder.Default
    private Boolean published = true;

    @Column(name = "hero_image", length = 500)
    private String heroImage;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "contact_number")
    private String contactNumber;

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
