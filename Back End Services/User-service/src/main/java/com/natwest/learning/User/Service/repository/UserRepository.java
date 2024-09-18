package com.natwest.learning.User.Service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.natwest.learning.User.Service.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmailId(String emailId);

}