package com.natwest.learning.Transaction.Service.Repository;

import com.natwest.learning.Transaction.Service.Model.Transaction;
import com.natwest.learning.Transaction.Service.Model.TransactionInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends MongoRepository<TransactionInfo,String> {

}
