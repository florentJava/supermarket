package floflo.api.koss.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import floflo.api.koss.entity.ProduitFacture;

@Repository
public interface ProduitFactureRepository  extends JpaRepository<ProduitFacture,Long>{
    
}
