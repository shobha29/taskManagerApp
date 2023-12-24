import database from '@react-native-firebase/database';
import {isEmpty} from 'lodash';

export const addUpdateTaskToDb = ({
  id = '',
  title = '',
  description = '',
  status = '',
}) => {
  let key;
  if (isEmpty(id)) {
    key = database().ref().push().key;
  } else {
    key = id;
  }

  const payload = {
    title,
    description,
    status,
  };

  database()
    .ref('task/' + key)
    .update(payload)
    .then(res => {
      console.log('task added', res);
    })
    .catch(err => {
      console.log('err added---', {err});
    });
};

export const deleteTaskFromDb = ({id}) => {
  database()
    .ref('task/' + id)
    .remove()
    .then(res => {
      console.log('task delete');
    })
    .catch(err => {
      console.log('err delete---', {err});
    });
};
