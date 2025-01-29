export enum RedirectPathEnum {
  RootPage = "/",
  LoginPage = "/login",
  Admin = "/admin",
  Menu = "/:id/menu",
  OrganizationsList = "/admin/organizations",
  MainPage = "/:id",
  OrganizationsSettings = "/:id/settings",
  StatisticsPage = "/:id/statistics",
  Branches = "/:id/branches",
  BranchSettings = "/:id/branches/:branchId/settings",
  PalettePage = "/:id/branches/:branchId/settings/palette",
  OrganizationUsers = "/:id/users",
  MenuProducts = "/:id/menu/:categoryId/products",
  BranchUsers = "/:id/branches/:branchId/users",
}

export enum PaletteEnum {
  white = "#ffffff",
  black = "#000000",
  gray = "#5e5e5e",
  blue = "#e3effb",
  green = "#e4fbe3",
}

export enum UserRoleIdEnum {
  SuperAdmin = 1,
  OrganizationAdmin = 2,
  Worker = 3,
  BranchAdmin = 4,
}

