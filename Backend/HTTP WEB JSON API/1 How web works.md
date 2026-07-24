# How web works !
##  Clients and servers
Computers connected to the internet are called clients and servers.
<img width="1193" height="371" alt="image" src="https://github.com/user-attachments/assets/e0b4affc-f15d-4f35-bc4b-2299d13947e3" />

Now these Two circles representing client and server. An arrow labeled request is going from client to server, and an arrow labeled responses is going from server to client

* Clients are the typical web user's internet-connected devices (for example, your computer connected to your Wi-Fi, or your phone connected to your mobile network). web-accessing software available on those devices (usually a web browser like Firefox or Chrome).
* Servers are computers that store webpages, sites, or apps. When a client wants to access a webpage, a copy of the webpage code is downloaded from the server to the client machine, where it is rendered by the browser and displayed to the user.

* Your internet connection: Allows you to send and receive data on the internet. It's basically like the street between your house and the shop.

* TCP/IP: Transmission Control Protocol and Internet Protocol (TCP/IP) are communication protocols that define how data should travel across the internet. This is like the transport mechanisms that let you place an order, go to the shop, and buy your goods. In our example, this is like a car or a bike (or however else you might travel along the road).

* DNS: The Domain Name System (DNS) is like an address book for websites. When you type a web address in your browser, the browser looks at the DNS to find the website's IP address — the actual address the server is located at — before it can retrieve the website (see DNS explained below for more information). The browser needs to find out which server the website lives on, so it can send HTTP messages to the right place (see below). This is like looking up the address of the shop before you visit it.

* HTTP: Hypertext Transfer Protocol (HTTP) is an application protocol that defines a language for clients and servers to speak to each other. This is like the language you use to order your goods. See HTTP basics below.


# 🌐 Web Fundamentals: How the Internet and Web Work

> A concise summary of the important points from browser input to server response and rendering.

---

## 1. The Big Picture

- The **Internet** is a global network of connected computers and networks.
- The **Web** is a service that runs on top of the Internet. Websites and web applications communicate mainly through **HTTP/HTTPS**.
- A **browser** is a client. A **web server** receives requests and sends responses.
- **Basic flow:** `User → Browser → DNS → Internet routing → Server → Response → Browser rendering`

---

## 2. What Happens When You Enter Something in the Address Bar?

- The browser first **interprets** what you typed.
- If the input looks like a complete domain or URL, the browser attempts **navigation**.
- If you type only a word such as `google` or `javascript`, the browser usually treats it as a **search query** and sends it to the configured search engine.
- Browser **history and autocomplete** may suggest or complete a previously visited website.
- Search engines and website navigation are **separate**: the search engine returns links, and clicking one starts a new navigation request.

---

## 3. DNS: Turning a Domain Name into an IP Address

- Humans use names such as `example.com`; computers communicate using **IP addresses**.
- **DNS** stands for **Domain Name System** and translates a domain name into an IP address.
- The browser and operating system may first check **local caches**.
- If the answer is not cached, a **DNS resolver** is contacted.
- The resolver may follow the hierarchy:
  ```
  Root DNS → Top-Level Domain server (e.g. .com) → Authoritative DNS server

  ```
- The **authoritative server** returns the IP address associated with the domain.
- The result may be **cached** for a period of time.
- DNS **only finds the destination**. It does not deliver the website's HTML, CSS, JavaScript, or API data.

---

## 4. IP: Addressing and Routing

- **IP** stands for **Internet Protocol**.
- IP gives devices **addresses** and helps packets travel from source to destination.
- Data is divided into **packets** and forwarded through routers across multiple networks.
- **Routers** examine destination information and forward packets toward the destination.
- The exact route can vary; Internet traffic does **not** necessarily use one fixed path.

---

## 5. TCP: Reliable Delivery

- **TCP** stands for **Transmission Control Protocol**.
- TCP provides **reliable, ordered delivery** of data between endpoints.
- Large data is divided into **smaller pieces** at the transport layer.
- **Sequence information** allows the receiver to identify the correct order.
- **Lost data** can be retransmitted.
- **Out-of-order data** can be reordered before being presented to the application.
- The application generally sees a **reliable ordered byte stream**.

---

## 6. HTTP: The Language of Web Communication

- **HTTP** stands for **Hypertext Transfer Protocol**.
- HTTP defines how a client **asks for resources** and how a server **responds**.
- A **request** commonly contains:
  - Method
  - URL / Path
  - Headers
  - Body *(sometimes)*
- A **response** commonly contains:
  - Status code
  - Headers
  - Body *(sometimes)*
- HTTP defines **communication rules**; IP handles **addressing/routing**, and TCP provides **reliable transport**.
- **HTTPS** is HTTP protected by **TLS encryption**.

---

## 7. Typical Website Request Flow
1. You type a URL or click a link.
2. The browser figures out the domain.
3. It may use cache and then resolve the domain via DNS.
4. It gets the server’s IP.
5. It establishes a connection (for HTTPS: TCP setup + TLS negotiation).
6. The browser sends an HTTP request (e.g., `GET /`).
7. The request travels through networks/routers.
8. The server receives and processes it (read files, run code, query DB, call services).
9. The server builds an HTTP response.
10. The response travels back.
11. The browser parses the result.
12. It downloads any additional resources (CSS/JS/images, etc.).

---

## 8. How Data Travels in Chunks
Large data is split into smaller pieces across networking layers. IP uses packets and TCP uses a reliable ordered byte stream split into segments. Packets/segments can be lost, delayed, duplicated, or arrive out of order, but TCP tracks delivery using sequence numbers and acknowledgements, retransmitting missing data and reassembling everything in order before the app uses it.

---

## 9. HTTP Request Structure
- **Method**: the requested action (e.g., **GET** or **POST**)
- **URL/path**: the resource being requested
- **Headers**: metadata about the request
- **Body**: optional data sent to the server (commonly with **POST/PUT/PATCH**)
- **Example**: `GET /users` retrieves the users resource

---

## 10. HTTP Response Structure
- **Status code**: indicates the general outcome
- **Response headers**: metadata such as content type and caching rules
- **Response body**: the returned content (e.g., HTML, JSON, images)

---

## 11. Important HTTP Status Codes
- **200 OK**: success  
- **201 Created**: resource created  
- **204 No Content**: success with no body  
- **301/308**: permanent redirect  
- **302/307**: temporary redirect  
- **400**: bad request  
- **401**: unauthorized/authentication required  
- **403**: forbidden/insufficient access  
- **404**: not found  
- **405**: method not allowed  
- **429**: rate limit exceeded  
- **500**: internal server error  
- **502**: bad gateway  
- **503**: service unavailable  

---

## 12. Common Failure Scenarios
- **DNS failure**
- **No network connection**
- **Connection refused**
- **Timeout**
- **Packet loss**
- **TLS/certificate errors**
- **404/401/403/500/503** responses during request handling

---

## 13. Search Engines vs Websites
- Address-bar input may go to a **search engine**
- Search engines maintain an index of pages via crawlers
- They rank results and send a results page back to the browser
- Clicking a result triggers a new request to the selected website

---

## 14. Core Mental Model
- Browser input flows through layers:
**DNS (domain → location)** → **IP (packet routing)** → **TCP (reliable delivery)** → **TLS (encryption + authentication)** → **HTTP (request/response semantics)** → **browser rendering**

---

### One-Line Summary
- Browser interprets input → DNS finds an IP → network protocols move data → TCP/TLS establish reliable secure
communication → HTTP request reaches the server → server processes it → HTTP response returns → the data is
reconstructed into an ordered stream → the browser processes and renders the result.
- Study note: You do not need to implement DNS, TCP, IP, or TLS yourself to become a web developer. The goal is to understand the
responsibility of each layer and how they work together.
- Once this mental model is clear, HTTP requests, REST APIs, Fetch, backend
servers, and databases become much easier to understand.

---
