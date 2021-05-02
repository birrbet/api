export default abstract class CreateUserDTO {
  abstract firstName: string;
  abstract lastName: string;
  abstract username: string;
  abstract password: string;
  abstract role: string;
  abstract age?: string;
}
