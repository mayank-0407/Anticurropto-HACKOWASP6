# Anti Corrupto
In today's governance landscape, transparency and accountability are indispensable for fostering trust and combatting corruption. Manual processes and opaque systems often facilitate misconduct, leading to public disillusionment. This project addresses these challenges by harnessing innovative technologies, notably blockchain and analytics, to revolutionize governance practices. Through blockchain-powered systems like automated traffic monitoring and automated challan systems through edge computing and a secure land registry, tamper-proof records are established, minimizing corruption opportunities. Smart contracts automate ticketing and fund allocation processes, reducing bribery risks. A secure whistleblower platform fosters accountability. Data-driven insights enable efficient resource allocation. This platform encourages transparency and fosters a culture of accountability within governmental institutions. Addressing issues in land registry, such as stamp duty evasion and undervaluation, the project aims to restore public trust in governmental systems. The project sets a precedent for responsible and effective administration, ultimately fostering a more equitable and just society.

# Description To Land Chain ( Subpart of Anticorrupto ):
Anti corrupto implements decentralized land registration system
- Blockchain-based Transactions: The system utilizes blockchain technology to create a secure and tamper-proof record of land ownership and transfers. This ensures:
- Immutability: Once a transaction is recorded on the blockchain, it cannot be altered or deleted.
- Transparency: Everyone with permission can access the land registry and verify ownership history.
- Machine Learning for Price Detection: An ML model analyzes various factors to estimate the fair market value of land in a specific location. This helps identify transactions with significantly lower declared values, potentially indicating tax evasion.
- Automated Inquiry System: If the ML model detects a significant discrepancy between the declared value and the estimated market value, an automated inquiry is raised. This eliminates human intervention and reduces the possibility of bribery.

Used Polygon/Sepolia Ethereum Blockchain for testing and deploying solidity smart contracts

![image](https://github.com/mayank-0407/Anticurropto-HACKOWASP6/assets/95279293/24ca309e-e5f6-4c63-9759-72d6fc29786e)

# ML Model got 98.73% model accuracy for Polynomial Features

# Pre-Requisite
- Docker Desktop
- VS-Code
- Node Js

# Steps to run the project In fewer Steps
- git clone https://github.com/mayank-0407/Anticurropto-HACKOWASP6.git //Clone the repository
- Go into the repository and open vs code
- Install reboot terminal Extension ( it will automatically install everything to run the project )
- In terminal type cd web3
- Add private key and alchemy block url in hardhat config file
- Now deploy it npx hardhat run deploy/scripts.js --networks polygonAmoy
- Now copy the transaction address and paste it frontend/src/utils/web3/constants.js
- Now you are all set to open the URL in the browser with web3 wallet  ( http://localhost:5173/ )

# OR

# Steps to Run Project Manually
# Frontend:
- cd frontend
- npm i
- npm run dev

# Database:
- cd backend
- docker compose up

# Backend:
- cd backend
- npm i
- npx prisma migrate dev
- npx prisma generate
- nodemon

# ML model python app:
- cd mlapi
- pip install -r requirements.txt
- python app.py

# web3:
- cd web3
- npm I
- npx hardhat run scripts/deploy.js --network polygonAmoy/sepolia
