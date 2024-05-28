package floflo.api.koss.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import floflo.api.koss.entity.Employe;

public interface EmployeRepository extends JpaRepository<Employe,Long> {

}
