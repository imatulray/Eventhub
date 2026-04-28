

export interface ILoginPage {
    goToLogin(): Promise<void>;
    login(email: string, password: string): Promise<void>;
    logout(): Promise<void>;

}