# Investment-Tracking-app-based-on-Microservice-Architecture
An Investment Tracking app built using the concepts of Microservice Architecture and Load Balancing.
<br/><br/>
## About
This app helps a person to manage and track his/her current Stock Investments. It provides features by which the user can segregate the stock investments into different portfolios (Ex. Technology, Automobiles, FMCG). It helps them to buy/sell stocks with real-time prices using APIs. It also provides them with a consolidated view about their investments in form of a donut chart.
Note: This app is kind of a paper-trading app and cannot be used for actual buying and selling of Stocks
<br/><br/>
## Following technologies are used for development of this project:
- Spring Boot
- Spring Cloud API Gateway
- Eureka Server
- React
- MongoDB
- MySQL
<br/><br/>
## Architecture Diagram:
![Arcitecture Diagram](https://github.com/user-attachments/assets/a7499cda-f28e-404f-adb9-06a3cfeed01b)
<br/><br/>
## Screenshots:
1. Home Screen
![image](https://github.com/user-attachments/assets/c3b37a02-fdfe-4372-9bdf-1b71b4e923bf)
***
![image](https://github.com/user-attachments/assets/22b97d5e-575d-40ae-85d7-d3b5988da2fc)
***
2. Register Page
![image](https://github.com/user-attachments/assets/a3b2dac7-3d88-45f9-8de0-73f02dc5fcef)
***
3. Login Page
![image](https://github.com/user-attachments/assets/4291b0b5-1e44-42e0-a9e4-e60a45109ecb)
***
4. Dashboard
![image](https://github.com/user-attachments/assets/31cf97a4-230b-40d0-bb9a-dbb666ae4c7f)
***
5. Portfolio Info
![image](https://github.com/user-attachments/assets/ea5e243e-0bdb-48cf-9b71-55638316ef60)
***
![image](https://github.com/user-attachments/assets/dcb99b0f-96de-4f0c-9f8b-6da4ab4cb046)
***
![image](https://github.com/user-attachments/assets/74a06c9c-df75-4bbf-b563-31ce8dfa0477)
***
6. ESG Rating Page
![image](https://github.com/user-attachments/assets/c883e5fd-0517-46e6-9676-1b1ee5bc9cff)
---
<br/><br/>
## How to Run:
1. Make sure MongoDB(DB: investmentTracker) and MySQL(DB: investmentTracker) are configured properly. 
2. Also update your JDBC url, username and password in Back End Services\User-service\src\main\resources\application.yml. These can be referred from MySQL Workbench.
3. Open all Back End Services in an IDE(preferably in Intellij as maven projects), make sure that the location to .m2 folder(used for Spring Boot Dependencies) is configured properly in the IDE. 
4. Run mvn install for all Back End Services.
5. Start all Back End Services, preferable in following order :- EurekaServer>APIGateway>Dashboard>Portfolio-Service>Transaction-Service>User-Service>Watchlist-Service
6.You can check if all are working by visiting this URL in any browser: http://localhost:8761/
7. Now for front End Service you need to first get an API key from Rapid API website to use the API services. After obtaining the key update it in the code snippets where Rapid API URLs are present. Sometime the URLs can become outdated and no longer perform the required functionality, for such scenarios update them with some other URL from Rapid API. 
8. Open Front End folder in an IDE and run :- npm install, to download the dependencies.
9. Now run the Front End using npm start and its done!
