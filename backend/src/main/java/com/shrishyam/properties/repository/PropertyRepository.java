package com.shrishyam.properties.repository;

import com.shrishyam.properties.entity.PropertyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface PropertyRepository extends JpaRepository<PropertyEntity, Long> {

    List<PropertyEntity> findByPublishedTrue();

    List<PropertyEntity> findByFeaturedTrueAndPublishedTrue();

    Optional<PropertyEntity> findBySlug(String slug);

    @Query("SELECT p FROM PropertyEntity p WHERE p.published = true AND " +
           "(:purpose IS NULL OR LOWER(p.purpose) = LOWER(:purpose)) AND " +
           "(:type IS NULL OR LOWER(p.propertyType) = LOWER(:type)) AND " +
           "(:sector IS NULL OR LOWER(p.sector) = LOWER(:sector))")
    List<PropertyEntity> searchProperties(String purpose, String type, String sector);
}
