# Arquitetura ingresso.com

## 📚 Contexto

Este desafio tem como objetivo criar um sistema inspirado na arquitetura do ingresso.com, utilizando conceitos modernos de desenvolvimento como microsserviços, Event-Driven Architecture (EDA), workers e testes de carga para simular cenários reais de alta demanda.

## 🚀 Desafio

1. Catálogo de Eventos (Catalog Service)

   - CRUD do catalogo (shows, teatros, cinemas, etc.).

2. Reserva de ingressos (Order Service)

   - Gerenciar a reserva de ingressos para os eventos.
   - Processamento de reservas.
   - Controle de concorrência para evitar overbooking.

3. Pagamento (Payment Service)
   - Integração com gateways de pagamento simulados.
   - Simulação de processamento de pagamentos falsos (Gerar respostas aleatórias de sucesso ou falha para fins de teste).

## ⚙️ Requisitos Técnicos

1. Microsserviços independentes e desacoplados: Cada serviço deve ser responsável por uma funcionalidade específica, permitindo fácil escalabilidade e manutenção.

2. Comunicação entre serviços via mensageria: Utilizar um broker de mensagens como RabbitMQ ou Kafka para garantir a comunicação eficiente e resiliente entre os microsserviços.

3. Bancos de dados distribuídos: Selecionar bancos de dados adequados para cada serviço (PostgreSQL para consistência transacional ou MongoDB para flexibilidade).

4. Simulação de alta carga: Criar cenários para testar o comportamento do sistema sob milhares de requisições simultâneas, garantindo a estabilidade e o desempenho da aplicação.
