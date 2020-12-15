import React, {useEffect, useState} from "react";
import axios from "axios";
import {Badge, Box, Grid} from "@material-ui/core";
import {DatePicker} from "@material-ui/pickers";
import {findUserByUsername, getAllEmployeeSeats, getChairLocation, getUserInfoById} from "../../../utils";
import {SeatingDetail} from "../../common/components";
import {convertDate} from "../../../utils/tools";

const DATE_PATTERN = /^(.*?)-(.*?)-(.*?)$/;

export function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(convertDate(new Date()));
  const [unformattedDate, setUnformattedDate] = useState(new Date());
  const [userId, setUserId] = useState("");
  const [reservations, setReservations] = useState([]);
  const [currentOccupancy, setcurrentOccupancy] = useState({});
  const [currentData, setCurrentData] = useState({});
  
  const parseDate = (date) => {
    const match = date.match(DATE_PATTERN);
    if (!match) {
      return;
    }
    return new Date(match[1], match[2] - 1, match[3]);
  };
  
  
  
  useEffect(() => {
    let found = false;
    
    const user = localStorage.getItem("user");
    findUserByUsername(user)
      .then(({data}) => {
        setUserId(data.id);
      })
      .catch(e => {
        console.error(e)
      })
    
    getAllEmployeeSeats(userId)
      .then(({data}) => {
        setReservations(data);
        if (!!reservations.length)
          reservations.forEach(reservation => {
            if (reservation.occupancyDate === selectedDate) {
              setcurrentOccupancy(reservation);
              found = true;
            }
            if (!found) {
              setcurrentOccupancy({});
            }
          });
      })
      .catch(e => {
        console.error(e)
      });
  }, [selectedDate]);
  
  useEffect(() => {
    
    getAllEmployeeSeats(userId)
      .then(({data}) => {
        setReservations(data);
      })
      .catch(e => {
        console.error(e)
      });
  }, [userId]);
  
  useEffect(() => {
    getReservationData()
      .catch(e => {
        console.error(e);
      })
  }, [currentOccupancy]);
  
  const handleDateChange = (date) => {
    setSelectedDate(convertDate(date));
    setUnformattedDate(date);
  };
  
  return (
    <Grid container>
      <Grid item>
        <Box mt={3} ml={3} mr={3}>
          <DatePicker
            autoOk
            orientation="landscape"
            variant="static"
            openTo="date"
            value={unformattedDate}
            onChange={handleDateChange}
            renderDay={(
              day,
              _selectedDate,
              _isInCurrentMonth,
              dayComponent
            ) => {
              let badge = false;
              if (reservations.length) {
                reservations.forEach((reservation) => {
                  const date = parseDate(reservation.occupancyDate);
                  if (date.valueOf() === day.valueOf()) {
                    badge = true;
                  }
                });
              }
              return (
                <Badge
                  variant={badge ? "dot" : undefined}
                  color={badge ? "secondary" : undefined}
                  badgeContent={badge ? "" : undefined}
                  overlap="circle"
                >
                  {dayComponent}
                </Badge>
              );
            }}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box mt={3} ml={3} mr={3}>
          {Object.keys(currentOccupancy).length !== 0 ? (
            <SeatingDetail reservationData={currentData}/>
          ) : (
            <h2>No reservation on this date</h2>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
