package com.shrishyam.properties.repository;

import com.shrishyam.properties.entity.LeadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeadRepository extends JpaRepository<LeadEntity, Long> {

    List<LeadEntity> findByStatus(String status);

    List<LeadEntity> findAllByOrderByCreatedAtDesc();
}
