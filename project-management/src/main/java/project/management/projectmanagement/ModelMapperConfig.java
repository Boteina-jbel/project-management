package project.management.projectmanagement;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import project.management.dto.FeatureTaskRequestDto;
import project.management.entities.FeatureTask;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Set the matching strategy
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        // Define explicit mappings for properties
        modelMapper.createTypeMap(FeatureTaskRequestDto.class, FeatureTask.class)
                .addMapping(FeatureTaskRequestDto::getStatusId, (destination, value) -> destination.getStatus().setId((Long) value))
                .addMapping(FeatureTaskRequestDto::getProjectId, (destination, value) -> destination.getProject().setId((Long) value))
                .addMapping(FeatureTaskRequestDto::getUserAssignedToId, (destination, value) -> destination.getUser().setId((Long) value));

        return modelMapper;
    }
}
