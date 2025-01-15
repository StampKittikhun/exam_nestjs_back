import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class DatabaseModule {
  static forRoot(configs: any[]): DynamicModule {
    // แปลงคอนฟิกให้เป็นการเชื่อมต่อฐานข้อมูล
    const connections = configs.map((config, index) => 
      TypeOrmModule.forRoot({
        name: config.name || `connection_${index}`, // ระบุชื่อการเชื่อมต่อ
        type: config.type || 'mysql', // ประเภทฐานข้อมูล
        host: config.host || 'localhost', // โฮสต์
        port: config.port || 3306, // พอร์ต
        username: config.username, // ชื่อผู้ใช้
        password: config.password, // รหัสผ่าน
        database: config.database, // ชื่อฐานข้อมูล
        synchronize: config.synchronize || false, // ใช้เฉพาะ Dev เท่านั้น
        autoLoadEntities: config.autoLoadEntities || true, // โหลด Entity อัตโนมัติ
      }),
    );

    // คืนค่า Dynamic Module พร้อมการเชื่อมต่อ
    return {
      module: DatabaseModule,
      imports: connections,
    };
  }
}
