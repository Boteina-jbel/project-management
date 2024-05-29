package project.management.services;

import org.springframework.stereotype.Service;
import project.management.entities.OpeningHours;
import project.management.entities.User;
import project.management.utils.ErrorCode;
import project.management.utils.ProjectManagementException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Service
public class OpeningHoursServiceImpl implements OpeningHoursService {

    @Override
    public void checkOpeningHoursAccess(User user) {
           if(user.getProfile().getOpeningHours() == null) return;
           checkOpeningHours(user.getProfile().getOpeningHours());
    }

    //--------------------------------------------------------------------------------------------
    // PROTECTED FUNCTIONS
    //--------------------------------------------------------------------------------------------

    protected void checkOpeningHours(OpeningHours openingHours) {

        ZoneId zoneId = ZoneId.of("Africa/Casablanca");
        LocalDate currentDate = LocalDate.now(zoneId);
        int dayOfWeekNumber = currentDate.getDayOfWeek().getValue();

        String openingTimeAm = null;
        String closingTimeAm = null;
        String openingTimePm = null;
        String closingTimePm = null;

        switch (dayOfWeekNumber){
            case 1: {
                openingTimeAm = openingHours.getOpeningTimeAm1();
                closingTimeAm = openingHours.getClosingTimeAm1();
                openingTimePm = openingHours.getOpeningTimePm1();
                closingTimePm = openingHours.getClosingTimePm1();
                break;
            }
            case 2:{
                openingTimeAm = openingHours.getOpeningTimeAm2();
                closingTimeAm = openingHours.getClosingTimeAm2();
                openingTimePm = openingHours.getOpeningTimePm2();
                closingTimePm = openingHours.getClosingTimePm2();
                break;
            }
            case 3:{
                openingTimeAm = openingHours.getOpeningTimeAm3();
                closingTimeAm = openingHours.getClosingTimeAm3();
                openingTimePm = openingHours.getOpeningTimePm3();
                closingTimePm = openingHours.getClosingTimePm3();
                break;
            }
            case 4: {
                openingTimeAm = openingHours.getOpeningTimeAm4();
                closingTimeAm = openingHours.getClosingTimeAm4();
                openingTimePm = openingHours.getOpeningTimePm4();
                closingTimePm = openingHours.getClosingTimePm4();
                break;
            }
            case 5:{
                openingTimeAm = openingHours.getOpeningTimeAm5();
                closingTimeAm = openingHours.getClosingTimeAm5();
                openingTimePm = openingHours.getOpeningTimePm5();
                closingTimePm = openingHours.getClosingTimePm5();
                break;
            }
            case 6:{
                openingTimeAm = openingHours.getOpeningTimeAm6();
                closingTimeAm = openingHours.getClosingTimeAm6();
                openingTimePm = openingHours.getOpeningTimePm6();
                closingTimePm = openingHours.getClosingTimePm6();
                break;
            }
            case 7: {
                openingTimeAm = openingHours.getOpeningTimeAm7();
                closingTimeAm = openingHours.getClosingTimeAm7();
                openingTimePm = openingHours.getOpeningTimePm7();
                closingTimePm = openingHours.getClosingTimePm7();
                break;
            }
            default: {
                throw new ProjectManagementException(ErrorCode.openingHours_not_defined, "Opening hours not defined for current day" );
            }

        }

        if ( (openingTimeAm == null || closingTimeAm == null) && (openingTimePm == null || closingTimePm == null) ) {
            throw new ProjectManagementException(ErrorCode.openingHours_not_defined, "Opening hours not defined for current day" );
        }

        // The time should follow this pattern in the database: 08:00 not 8:00 representing AM and 12:00.
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        LocalTime openingTimeAmLocal = null;
        LocalTime closingTimeAmLocal = null;
        LocalTime openingTimePmLocal = null;
        LocalTime closingTimePmLocal = null;

        // AM
        if(openingTimeAm != null && closingTimeAm != null) {
            // Convert String into LocalTime
            openingTimeAmLocal = LocalTime.parse(openingTimeAm, formatter);
            closingTimeAmLocal = LocalTime.parse(closingTimeAm, formatter).withSecond(59).withNano(999);
        }

        // PM
        if(openingTimePm != null && closingTimePm != null) {
            // Convert String into LocalTime
            openingTimePmLocal = LocalTime.parse(openingTimePm, formatter);
            closingTimePmLocal = LocalTime.parse(closingTimePm,formatter).withSecond(59).withNano(999);
        }

        // Check if user is trying to have access to the app within openingHours defined
        LocalTime currentTime = LocalTime.now(zoneId);
        boolean isWithinOpeningHours = false;

        // Checking AM
        if ( (openingTimeAmLocal != null && closingTimeAmLocal != null)
                && (currentTime.isAfter(openingTimeAmLocal) && currentTime.isBefore(closingTimeAmLocal))){
            isWithinOpeningHours = true;
        }

        // Checking PM
        if ( (openingTimePmLocal != null && closingTimePmLocal != null)
                && (currentTime.isAfter(openingTimePmLocal) && currentTime.isBefore(closingTimePmLocal))){
            isWithinOpeningHours = true;
        }

        if (! isWithinOpeningHours) throw new ProjectManagementException(ErrorCode.access_not_in_openingHours, "Access not allowed during non-opening hours");

    }
}
