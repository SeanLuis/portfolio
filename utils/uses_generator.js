"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var additionalTechItems = [
    {
        "name": "Centrifugo",
        "description": "Centrifugo é um servidor de mensagens em tempo real, que permite a implementação de funcionalidades como chats, notificações em tempo real e atualizações ao vivo.",
        "url": "https://centrifugal.dev/",
        "category": "backend",
        "thumbnail": "/uses/centrifugo.png",
    },
    {
        "name": "Digital Ocean",
        "description": "Digital Ocean oferece serviços de cloud computing simplificados, facilitando o deploy de aplicações, armazenamento de dados, e gerenciamento de infraestrutura.",
        "url": "https://www.digitalocean.com/",
        "category": "cloud",
        "thumbnail": "/uses/digital-ocean.png",
    },
    {
        "name": "Java Spring Boot",
        "description": "Spring Boot facilita a criação de aplicações stand-alone baseadas em Spring, com mínima configuração.",
        "url": "https://spring.io/projects/spring-boot",
        "category": "backend",
        "thumbnail": "/uses/java-spring-boot.png",
    },
    {
        "name": "Hedera",
        "description": "Hedera é uma rede de ledger distribuído público que suporta uma ampla gama de aplicações, de finanças descentralizadas a micropagamentos.",
        "url": "https://hedera.com/",
        "category": "blockchain",
        "thumbnail": "/uses/hedera.png",
    },
    {
        "name": "Polygon Zero Knowledge",
        "description": "Polygon Zero Knowledge utiliza provas de conhecimento zero para aumentar a privacidade e escalabilidade das transações na blockchain.",
        "url": "https://polygon.technology/solutions/polygon-zero/",
        "category": "blockchain",
        "thumbnail": "/uses/polygon-zero-knowledge.png",
    },
    {
        "name": "Hardhat",
        "description": "Hardhat é uma ferramenta de desenvolvimento Ethereum que facilita a compilação, implantação, teste e depuração de contratos inteligentes.",
        "url": "https://hardhat.org/",
        "category": "blockchain",
        "thumbnail": "/uses/hardhat.png",
    },
    {
        "name": "Express.js",
        "description": "Express.js é um framework web para Node.js, desenhado para construir aplicações web e APIs de forma rápida e fácil.",
        "url": "https://expressjs.com/",
        "category": "backend",
        "thumbnail": "/uses/express-js.png",
    },
];
additionalTechItems.forEach(function (item) {
    var fileName = "".concat(item.name.toLowerCase().replace(/ /g, "-").replace(/\./g, ""), ".json");
    (0, fs_1.writeFileSync)(fileName, JSON.stringify(item, null, 2));
});
