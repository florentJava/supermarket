package floflo.api.koss.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import floflo.api.koss.entity.Categorie;
import floflo.api.koss.entity.Produit;

@Repository
public interface ProduitRepository   extends JpaRepository<Produit, Long>{
    
        List<Produit> findByCategoriesContains(Categorie categorie);
        Optional<Produit> findByNom(String nom);

}
