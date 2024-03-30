import { Test, TestingModule } from '@nestjs/testing';
import { SocketsService } from '../sockets.service';
import { RoomService } from '../../room/room.service';

describe('SocketsService', () => {
  let service: SocketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocketsService,
        {
          provide: RoomService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SocketsService>(SocketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
