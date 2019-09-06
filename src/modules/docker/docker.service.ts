import { Injectable } from '@nestjs/common';
import * as Docker from 'dockerode';

const docker = new Docker({
  socketPath: '/var/run/docker.sock'
});

@Injectable()
export class DockerService {
  public async getContainers() {
    return docker.listContainers({
      all: true
    });
  }
}
