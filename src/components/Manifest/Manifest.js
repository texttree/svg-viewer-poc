import axios from 'axios';
import React from 'react';
import YAML from 'js-yaml-parser';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

function Manifest({ link, setProject }) {
  const [projects, setProjects] = React.useState([]);
  const [items, setItems] = React.useState();
  const [current, setCurrent] = React.useState(0);
  React.useEffect(() => {
    axios
      .get(link)
      .then((res) => {
        const json = res.data ? YAML.safeLoad(res.data) : null;

        if (json != null) {
          const _projects = json.projects.filter(
            (project) => project.identifier !== 'marks'
          );
          console.log({ _projects });
          setProjects(_projects);
          setProject(_projects[current]);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  React.useEffect(() => {
    // console.log(projects);
    if (projects.length > 0) {
      const _items = projects.map((el, index) => (
        <MenuItem key={index} value={index}>
          {el.title}
        </MenuItem>
      ));
      setItems(_items);
    }
  }, [projects]);

  const handleChange = (e) => {
    setCurrent(e.target.value);
    setProject(projects[e.target.value]);
  };
  return (
    <>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Projects</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={current}
          onChange={handleChange}
        >
          {items}
        </Select>
      </FormControl>
    </>
  );
}

export default Manifest;
