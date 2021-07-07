export class Framework {
  name: string;
  versions: string[];

  constructor(name: string, versions: string[]) {
    this.name = name;
    this.versions = versions;
  }
}