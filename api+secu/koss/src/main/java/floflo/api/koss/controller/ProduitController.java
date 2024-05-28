package floflo.api.koss.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import floflo.api.koss.dto.ProduitDto;
import floflo.api.koss.service.ProduitService;



@RestController
@RequestMapping("/api/produits")
public class ProduitController {

    private final ProduitService produitService;

    public ProduitController(ProduitService produitService) {
        this.produitService = produitService;
    }


    @GetMapping("")
    public List<ProduitDto> findAllProduits() {
        return produitService.findAll();
    }
    

    @PostMapping("") 
    public ResponseEntity<ProduitDto> save(@RequestBody ProduitDto produitDto) {
        return  ResponseEntity.ok(produitService.save(produitDto));
    }


    @PostMapping("/{produitId}/categories/{categorieId}")
    public ResponseEntity<ProduitDto> ajouterCategorie(@PathVariable Long produitId, @PathVariable Long categorieId) {

        produitService.ajouterCategorie(produitId, categorieId);

        Optional<ProduitDto> produitDto = produitService.findById(produitId);

        if(produitDto.isPresent()) {
            return ResponseEntity.ok(produitDto.get());
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{produitId}")
    public ResponseEntity<ProduitDto> findById(@PathVariable Long produitId) {

        Optional<ProduitDto> produitDto = produitService.findById(produitId);

        if (produitDto.isPresent()) {
            return ResponseEntity.ok(produitDto.get());
            
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/update")
    public ResponseEntity<ProduitDto> updateEmployee(@RequestBody ProduitDto produitDto) {
        //TODO: process PUT request

        Optional<ProduitDto> opPrDto = produitService.updateProduit(produitDto);

        if (opPrDto.isPresent()) {
            return ResponseEntity.ok(opPrDto.get());
            
        }
        

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{produitId}/categories/{categorieId}")
    public ResponseEntity<?> supprimerCategorie(@PathVariable Long produitId, @PathVariable Long categorieId) {
        Optional<ProduitDto> produitDto = produitService.supprimerCategorie(produitId, categorieId);

        if (produitDto.isPresent()) {
            return ResponseEntity.ok(produitDto.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{produitId}")
    public ResponseEntity<Boolean> deleteProduit(@PathVariable Long produitId) {
        Boolean bool = produitService.deleteProduit(produitId);

  
        return ResponseEntity.ok(bool);
    }  

    @PostMapping("/{id_produit}/qte/{qte}")
    public  ResponseEntity<ProduitDto> ravitallerProduit(@PathVariable Long id_produit,@PathVariable int qte ) {
        
        Optional<ProduitDto> opPrDto = produitService.ravitaller(id_produit, qte);

        return  opPrDto.isPresent()? ResponseEntity.ok(opPrDto.get()):ResponseEntity.notFound().build();
    }
    
}
