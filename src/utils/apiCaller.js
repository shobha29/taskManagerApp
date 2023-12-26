import database from '@react-native-firebase/database';
import {isEmpty} from 'lodash';

export const addUpdateTaskToDb = async ({
  id = '',
  title = '',
  description = '',
  status = '',
  timeStamp = '',
}) =>
  new Promise((resolve, reject) => {
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
      timeStamp,
    };

    database()
      .ref('task/' + key)
      .update(payload)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });

export const deleteTaskFromDb = async ({id}) =>
  new Promise((resolve, reject) => {
    database()
      .ref('task/' + id)
      .remove()
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
