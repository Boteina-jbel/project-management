package project.management.projectmanagement;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import project.management.dto.FeatureTaskRequestDto;
import project.management.entities.Task;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        // Other configuration settings (if needed)
        return modelMapper;
    }
}
