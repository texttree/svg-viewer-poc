import React, { useEffect, useState } from 'react';
import path from 'path';
import { Manifest, SvgViewer } from '..';
import axios from 'axios';

const server = 'https://git.door43.org/';

function MapsViewer({ username, repository }) {
  const [project, setProject] = useState();
  const [link, setLink] = useState();
  const [marks, setMarks] = useState();
  const uri = path.join(username, repository, 'raw/branch', 'master', './manifest.yaml');

  useEffect(() => {
    if (project) {
      const _link = path.join(username, repository, 'raw/branch', 'master', project.path);
      setLink(server + _link);
    }
  }, [project]);
  useEffect(() => {
    const _marksLink = path.join(
      username,
      repository,
      'raw/branch',
      'master',
      './marks.tsv'
    );
    axios
      .get(_marksLink)
      .then((res) => {
        setMarks(parsingTsv(res.data));
      })
      .catch((err) => console.log({ err }));
  }, []);

  const parsingTsv = (res) => {
    let marks = {};
    res.split('\n').forEach((row, i) => {
      const value = row.split('\t');
      if (i > 0) {
        marks[value[0]] = value[1];
      }
    });

    return marks;
  };

  return (
    <>
      <Manifest setProject={setProject} link={server + uri} />
      <SvgViewer link={link} marks={marks} />
    </>
  );
}

export default MapsViewer;
