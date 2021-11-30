import { connectToDatabase, Pig } from '$lib/models';
import { userNeedsToLogin } from '$lib/guards';

// const pigs = [
//   {
//     uid: '1',
//     name: 'Pig A',
//     img: 'https://images.pexels.com/photos/1300361/pexels-photo-1300361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//     birthDate: '1/01/2021',
//     breed: 'Berkshire',
//     description: 'Description for Pig A',
//     farmId: 1
//   },
//   {
//     uid: '2',
//     name: 'Pig B',
//     img: 'https://images.pexels.com/photos/4619531/pexels-photo-4619531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//     birthDate: '1/01/2021',
//     breed: 'Berkshire',
//     description: 'Description for Pig B',
//     farmId: 1
//   },
//   {
//     uid: '3',
//     name: 'Pig C',
//     img: 'https://cdn.pixabay.com/photo/2019/04/08/12/26/pig-4111895__340.jpg',
//     birthDate: '1/01/2021',
//     breed: 'Berkshire',
//     description: 'Description for Pig C',
//     farmId: 2
//   },
//   {
//     uid: '4',
//     name: 'Pig D',
//     img: 'https://cdn.pixabay.com/photo/2014/07/08/13/39/pigs-387204__340.jpg',
//     birthDate: '1/01/2021',
//     breed: 'Berkshire',
//     description: 'Description for Pig D',
//     farmId: 2
//   },
//   {
//     uid: '4',
//     name: 'Pig D',
//     img: 'https://cdn.pixabay.com/photo/2014/07/08/13/39/pigs-387204__340.jpg',
//     birthDate: '1/01/2021',
//     breed: 'Berkshire',
//     description: 'Description for Pig D',
//     farmId: 3
//   },
// ];


export const get = async (req, res) => {
  return {
    status: 200,
    body: {
      pig: await Pig.getById(req.body.pigId),
    }
  }
}

export const post = async (req, res) => {
  // Verify the user is logged in otherwise move on
  if (await userNeedsToLogin({
    // We have to kind of jankily pass the path we're on here. Not sure if there's
    // a more dynamic way to do this right now
    page: { path: '/pigs/getpig' },
    session: req.locals
  })) {
    // Here we re-direct to the login page if the user isn't authorized
    return {
      status: 302,
      headers: {
        location: '/login'
      },
    };
  }

  await connectToDatabase();

  if (req.body !== undefined && req.body.pigId !== undefined) {
    const pig = await Pig.getById(req.body.pigId);

    console.log(pig);
    return {
      status: 200,
      body: {
        pig
      }
    }
  };

  return {
    status: 301,
    redirect: '/farms',
  }
}


