import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { randomUUID } from "node:crypto";
import { CreateNotificationBody } from "./create-notification-body";

@Controller('notifications')
export class AppController {
    constructor(private readonly prisma: PrismaService) {}

    @Get()
    list() {
        return this.prisma.notification.findMany();
    }

    @Post()
    async create(@Body() body: CreateNotificationBody) {
        console.log(body)

        console.log({
            id: randomUUID(),
            ...body
        })
        await this.prisma.notification.create({
            data: {
                id: randomUUID(),
                ...body
            }
        })
        
    }

    @Delete(":id")
    async delete(@Param("id") id: string) {
        await this.prisma.notification.delete({
            where: {
                id
            }
        })
    }

    /*
    @Delete("multi")
    async deleteMulti(@Body() idList: any) {
        console.log(idList);
        for (const item of idList.id){
            await this.prisma.notification.delete({
                where: {
                    id: item
                }
            })
        }
    }
    */
}