package floflo.api.koss.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import floflo.api.koss.dto.EmployeDto;
import floflo.api.koss.service.EmployeService;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api/employes")
@RequiredArgsConstructor
public class EmployeController {

    private final EmployeService employeService;

    @GetMapping("")
    public List<EmployeDto> findAll() {
        return employeService.findAll();
    }

    @GetMapping("/{id_employe}")
    public ResponseEntity<EmployeDto> findById(@PathVariable Long id_employe) {

        Optional<EmployeDto> opEmployeDto = employeService.findById(id_employe);

        if (opEmployeDto.isPresent()) {
            return ResponseEntity.ok(opEmployeDto.get());
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping("")
    public EmployeDto newEmploye(@RequestBody EmployeDto employeDto) {
        return employeService.newEmploye(employeDto);
    }

    @PostMapping("/update")
    public ResponseEntity<EmployeDto> putMethodName(@RequestBody EmployeDto employeDto) {

        Optional<EmployeDto> opEmployeDto = employeService.updateEmploye(employeDto);

        if(opEmployeDto.isPresent())
        {
            return ResponseEntity.ok(opEmployeDto.get());
        }

        return ResponseEntity.notFound().build() ;
    }
    
}
