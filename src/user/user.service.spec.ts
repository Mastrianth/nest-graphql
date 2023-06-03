// import { Test, TestingModule } from '@nestjs/testing';
// import { UserService } from './user.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { User } from './entity/user.entity';

// describe('UserService', () => {
//   let userService: UserService;

//   const mockUserRepository = {
//     find: jest.fn(),
//     findOne: jest.fn(),
//     create: jest.fn(),
//     save: jest.fn(),
//     update: jest.fn(),
//     delete: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UserService,
//         {
//           provide: getRepositoryToken(User),
//           useValue: mockUserRepository,
//         },
//       ],
//     }).compile();

//     userService = module.get<UserService>(UserService);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('findAll', () => {
//     it('should return an array of users', async () => {
//       const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
//       mockUserRepository.find.mockReturnValue(users);

//       const result = await userService.findAll();

//       expect(result).toEqual(users);
//       expect(mockUserRepository.find).toHaveBeenCalledTimes(1);
//     });
//   });

//   describe('findOne', () => {
//     it('should return a user by ID', async () => {
//       const user = { id: 1, name: 'John' };
//       mockUserRepository.findOne.mockReturnValue(user);

//       const result = await userService.findOne(1);

//       expect(result).toEqual(user);
//       expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
//       expect(mockUserRepository.findOne).toHaveBeenCalledWith(1);
//     });
//   });

//   describe('create', () => {
//     it('should create a new user', async () => {
//       const newUser = { name: 'John' };
//       const createdUser = { id: 1, ...newUser };
//       mockUserRepository.create.mockReturnValue(newUser);
//       mockUserRepository.save.mockReturnValue(createdUser);

//       const result = await userService.create(newUser);

//       expect(result).toEqual(createdUser);
//       expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
//       expect(mockUserRepository.create).toHaveBeenCalledWith(newUser);
//       expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
//       expect(mockUserRepository.save).toHaveBeenCalledWith(newUser);
//     });
//   });

//   describe('update', () => {
//     it('should update an existing user', async () => {
//       const updatedUser = { id: 1, name: 'John Doe' };
//       mockUserRepository.update.mockReturnValue({ affected: 1 });

//       const result = await userService.update(1, updatedUser);

//       expect(result).toEqual(updatedUser);
//       expect(mockUserRepository.update).toHaveBeenCalledTimes(1);
//       expect(mockUserRepository.update).toHaveBeenCalledWith(1, updatedUser);
//     });
//   });

//   describe('remove', () => {
//     it('should delete a user', async () => {
//       mockUserRepository.delete.mockReturnValue({ affected: 1 });

//       const result = await userService.remove(1);

//       expect(result).toBeUndefined();
//       expect(mockUserRepository.delete).toHaveBeenCalledTimes(1);
//       expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
//     });
//   });
// });
