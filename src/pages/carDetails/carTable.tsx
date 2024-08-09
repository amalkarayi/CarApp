import React, { useState } from 'react';
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, FormControlLabel, Switch } from '@mui/material';
import { Car } from '@/common/models';

const columns = [
  { id: 'make', label: 'Make' },
  { id: 'model', label: 'Model' },
  { id: 'year', label: 'Year' },
  { id: 'images', label: 'Images' },
  { id: 'engine', label: 'Engine' },
  { id: 'horsepower', label: 'Horsepower' },
  { id: 'torque', label: 'Torque' },
  { id: 'transmission', label: 'Transmission' },
  { id: 'drivetrain', label: 'Drivetrain' },
];


interface CarDetailsProps {
  cars: Car[];
  enableHideStat?: boolean;
}

const CarCompareTable: React.FC<CarDetailsProps> = ({ cars, enableHideStat=false }) => {
  const [hideDuplicates, setHideDuplicates] = useState(false);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHideDuplicates(event.target.checked);
  };

  const areAllValuesSame = (cars: Car[], columnId: string) => {
    const firstValue = cars[0][columnId as keyof Car];
    return cars.every(car => car[columnId as keyof Car] === firstValue);
  };

  return (
    <Box
      sx={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: 4,
      }}
    >
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Car Comparison
        </Typography>
        {enableHideStat && <FormControlLabel
          control={<Switch checked={hideDuplicates} onChange={handleSwitchChange} />}
          label="Hide same stats"
        />}
        <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Table>
            <TableBody>
              {columns.map((column, columnIndex) => {
                if (hideDuplicates && areAllValuesSame(cars, column.id)) {
                  return null;
                }
                return (
                  <TableRow
                    key={column.id}
                    sx={{
                      backgroundColor:
                        columnIndex % 2 === 0
                          ? "rgba(77, 100, 211, 0.09)"
                          : "transparent",
                    }}
                  >
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {column.label}
                    </TableCell>
                    {cars?.map((car) => (
                      <TableCell
                        key={car.id}
                        sx={{ fontWeight: columnIndex === 0 ? "bold" : "normal" }}
                      >
                        {column.id === "images"
                          ? 
                              <img
                                src={car.images[0]}
                                alt={`${car.make} ${car.model}`}
                                width="100"
                              />
                          : car[column.id as keyof Car]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default CarCompareTable;