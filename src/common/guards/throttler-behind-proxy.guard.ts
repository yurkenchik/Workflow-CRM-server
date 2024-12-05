import { Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
    protected async getTracker(request: Record<string, any>): Promise<string> {
        return request.ips.length ? request.ips[0] : request.ip;
    }
}
