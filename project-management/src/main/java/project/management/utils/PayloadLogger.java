package project.management.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class PayloadLogger {

    protected Logger logger = LoggerFactory.getLogger(getClass());

    public String getJson(Object object, boolean beautify) {
        String json = "";
        try {

            ObjectWriter ow = null;
            if (beautify) {
                ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            } else {
                ow = new ObjectMapper().writer();
            }

            json =  ow.writeValueAsString(object);

        } catch (JsonProcessingException e) {
            logger.info("===========================  START JsonProcessingException ERROR  ================================================");
            e.printStackTrace();
            logger.info("==========================    END JsonProcessingException ERROR   ================================================");
        }
        return json;
    }
}
