package floflo.api.koss.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import floflo.api.koss.dto.EmployeDto;
import floflo.api.koss.dto.RoleDto;
import floflo.api.koss.entity.Employe;
import floflo.api.koss.entity.Role;
import floflo.api.koss.repository.EmployeRepository;
import floflo.api.koss.repository.RoleRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeService {
    private final EmployeRepository employeRepository;
    private final RoleRepository roleRepository;


    public EmployeDto newEmploye(EmployeDto employeDto){

        Employe employe = new  Employe();

        employe.setNom(employeDto.getNom());
        employe.setPrenom(employeDto.getPrenom());
        employe.setSexe(employeDto.getSexe());
        employe.setPhone(employeDto.getPhone());
        employe.setUserName(employeDto.getUserName());
        employe.setMdp(employeDto.getMdp());
        employe.setDateN(employeDto.getDateN());
        employe.setRoles(new ArrayList<Role>());
        

        for (RoleDto roleDto : employeDto.getRolesDto() ) {
            Role role = roleRepository.findById(roleDto.getId()).get();
            employe.getRoles().add(role);
        }

        employeRepository.save(employe);

        employeDto.setId(employe.getId());

        return employeDto;
    }

    public List<EmployeDto> findAll(){
        
        List<Employe> employes = employeRepository.findAll();
        List<EmployeDto> employeDtos = new ArrayList<EmployeDto>();

        for (Employe employe : employes) {
            employeDtos.add(new EmployeDto(employe));
        }
        return employeDtos;

    }


    public Optional<EmployeDto> findById(Long id){

        Optional<Employe> opEmploye = employeRepository.findById(id);

        if (opEmploye.isPresent()) {
            
            return Optional.of(new EmployeDto(opEmploye.get()));
        }

        return Optional.empty();

    }

    public Optional<EmployeDto> updateEmploye(EmployeDto employeDto){

        Optional<Employe> opEmploye = employeRepository.findById(employeDto.getId());

        if (opEmploye.isPresent()) {

            Employe employe = opEmploye.get();

            employe.setNom(employeDto.getNom());
            employe.setPrenom(employeDto.getPrenom());
            employe.setSexe(employeDto.getSexe());
            employe.setPhone(employeDto.getPhone());
            employe.setUserName(employeDto.getUserName());
            employe.setMdp(employeDto.getMdp());
            employe.setDateN(employeDto.getDateN());

            employe.setRoles(new ArrayList<>());

            for (RoleDto roleDto : employeDto.getRolesDto() ) {
                Role role = roleRepository.findById(roleDto.getId()).get();
                employe.getRoles().add(role);
            }

            employeRepository.save(employe);
            return Optional.of(new EmployeDto(opEmploye.get()));
        }


        return Optional.empty();
    }
    
}
