package com.foodkart.foodkart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FoodKartApplication {

    public static void main(String[] args) {
        SpringApplication.run(FoodKartApplication.class, args);
    }

    @Bean
    public TomcatServletWebServerFactory tomcatCustomizer() {
        TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
        factory.addConnectorCustomizers(connector -> {
            connector.setMaxPostSize(10 * 1024 * 1024); // 10MB
            connector.setProperty("maxHttpHeaderSize", "64KB");
        });
        return factory;
    }

}
