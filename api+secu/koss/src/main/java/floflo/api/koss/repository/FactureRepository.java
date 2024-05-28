package floflo.api.koss.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import floflo.api.koss.entity.Facture;

@Repository
public interface FactureRepository extends JpaRepository<Facture,Long> {
    
}
