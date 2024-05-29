package project.management.utils;

import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Data
public class ProjectManagementException extends RuntimeException {

    protected Logger logger = LoggerFactory.getLogger(getClass());

    protected ErrorCode errorCode;
    protected String message;

    public ProjectManagementException(ErrorCode errorCode, String message) {
        this.errorCode 		= errorCode;
        this.message 		= message;
    }

    @Override
    public void printStackTrace() {
        logger.error(
                "-------------------- SynerException -------------------- \n" +
                        " ErrorCode 	:{} \n" +
                        " Message 	    :{} \n" +
                        "--------------------------------------------------------- \n" ,
                errorCode.name(), getMessage());
        super.printStackTrace();
    }

}
