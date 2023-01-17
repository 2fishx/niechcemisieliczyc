import { Typography } from "@mui/material";

export const Info = () => {
  return (
    <>
      <>
        <Typography
          variant="h6"
          style={{ display: "inline-block", opacity: 0.7 }}
        >
          2fishx.
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          style={{ display: "inline-block" }}
        >
          Nie chce mi się liczyć
        </Typography>
        <Typography
          variant="h6"
          style={{ display: "inline-block", opacity: 0.7 }}
        >
          .com
        </Typography>
      </>
      <Typography variant="subtitle1" gutterBottom>
        Wpisz w pole poniżej kwoty donejtów, bitsów i ilośc subów z odpowiednią
        końcówką (z - złotych, b - bitsów, s - subów) i wciśnij enter lub guzik
        obok by obliczyć liczbę złotych jaką trzeba dodać do licznika w Tipply.
        Poniżej jest też historia dodawanych kwot.
      </Typography>
      <Typography variant="body1">Przykłady:</Typography>
      {["10.5z", "200b150b", "5s20s30z", "20z30z1000z42s700b69b"].map((e) => (
        <Typography key={e} variant="body1">
          {e}
        </Typography>
      ))}
    </>
  );
};
