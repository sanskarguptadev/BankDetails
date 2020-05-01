import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function Selects(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    city: ""
  });

  const [category, setCategory] = React.useState({
    cat: ""
  });

  const handleCity = event => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value
    });
    props.city(event.target.value);
  };

  const handleCategory = event => {
      const name = event.target.name;
      setCategory({
          ...state,
          [name]: event.target.value,
      })
      props.getType(event.target.value);
      props.enable();
    } 

  let dropDown;
  if(props.type === 'city'){
    dropDown = <div>
        <InputLabel htmlFor="outlined-city-native-simple">City</InputLabel>
        <Select
          native
          value={state.city}
          onChange={handleCity}
          label="City"
          inputProps={{
            name: "city",
            id: "outlined-city-native-simple"
          }}
        >
        <option aria-label="None" value="" />
          <option value="MUMBAI">MUMBAI</option>
          <option value="BANGALORE">BANGALORE</option>
          <option value="CHENNAI">CHENNAI</option>
          <option value="DELHI">DELHI</option>
          <option value="KOLKATA">KOLKATA</option>
        </Select>
    </div>
  } else if(props.type === 'category') {
      dropDown = <div>
        <InputLabel  htmlFor="outlined-city-native-simple"></InputLabel>
        <Select
          native
          value={category.cat}
          onChange={handleCategory}
          label="Parameter"
          inputProps={{
            name: "parameter",
            id: "outlined-parameter-native-simple"
          }}
        >
        <option aria-label="None" value="" />
          <option value="ifsc">IFSC</option>
          <option value="name">Bank Name</option>
          <option value="address">Address</option>
        </Select>
      </div>
  }
  return (
    <div>
      <FormControl className={classes.formControl}>
        {
          dropDown
        }
      </FormControl>
    </div>
  );
}
