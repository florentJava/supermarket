package floflo.api.koss.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import floflo.api.koss.dto.FactureDto;
import floflo.api.koss.dto.ProduitFactureDto;
import floflo.api.koss.service.FactureService;
import lombok.RequiredArgsConstructor;




@RestController
@RequestMapping("/api/factures")
@RequiredArgsConstructor
public class FactureController {

    private final FactureService factureService;

    @PostMapping("")
    public FactureDto creerFacture(@RequestBody List<ProduitFactureDto> produitDto) {

        FactureDto factureDto = new FactureDto();
        
        for (ProduitFactureDto pdto : produitDto) {
            
            // ProduitFactureDto produitFactureDto = new ProduitFactureDto();
            // produitFactureDto.setProduit(pdto);
            // produitFactureDto.setQte(3);
            
            // factureDto.getProduits().add(produitFactureDto);

            factureDto.getProduits().add(pdto);
        }

        return factureService.newFacture(factureDto);
    }


    @GetMapping("/{id_facture}")
    public  ResponseEntity<FactureDto> findById(@PathVariable Long id_facture) {
        
        Optional<FactureDto> op_factureDto = factureService.findById(id_facture);

        if (op_factureDto.isPresent()) {
            return ResponseEntity.ok(op_factureDto.get());
        }
        return ResponseEntity.notFound().build();
    }


    @GetMapping("")
    public ResponseEntity<List<FactureDto>> getAllFacture() {


        return  ResponseEntity.ok(factureService.findAll());
    }
    




}
