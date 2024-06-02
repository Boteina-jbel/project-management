package project.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Filter {

    private String username;
    private String firstName;
    private String lastName;
    private String legalIdNumber;
    private String apogeeCode;
    private String studentNationalCode;
    private String profileCode;
    private  String sortBy;
    private  String sortDirection;
    private Integer page;
    private Integer pageSize;
    private Integer count;
    private boolean countOnly;

}
