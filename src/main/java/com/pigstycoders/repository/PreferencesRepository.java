package com.pigstycoders.repository;

import com.pigstycoders.domain.Preferences;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Preferences entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PreferencesRepository extends JpaRepository<Preferences, Long> {}
