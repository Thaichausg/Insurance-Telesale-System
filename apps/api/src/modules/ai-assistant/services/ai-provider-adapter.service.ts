import { Injectable, Logger } from '@nestjs/common';
import { SystemConfigService } from '../../system-config/services/system-config.service';

@Injectable()
export class AiProviderAdapterService {
  private readonly logger = new Logger(AiProviderAdapterService.name);

  constructor(private readonly configService: SystemConfigService) {}

  /**
   * Truy vấn LLM (OpenAI/Gemini/Anthropic) dựa trên cấu hình Master.
   */
  async generateCompletion(promptText: string): Promise<string> {
    const config = await this.configService.getMasterConfig();
    const { provider, model } = config.ai;

    this.logger.log(`Calling AI Provider: ${provider} with Model: ${model}`);

    // Giả lập logic gọi SDK (OpenAI/GoogleAI) thực tế
    // Trong môi trường Production, đây sẽ là nơi gọi axios.post hoặc SDK client.
    await new Promise(res => setTimeout(res, 1200));

    if (!process.env.OPENAI_API_KEY && provider === 'OPENAI') {
       return `[FALLBACK] Hệ thống đang cấu hình dùng ${provider} nhưng chưa phát hiện API Key hợp lệ. Vui lòng kiểm tra System Config.`;
    }

    return `[AI Generated - ${provider}] Phản hồi cho khách hàng về: "${promptText}". Chúng tôi khuyến nghị gói bảo hiểm sức khỏe toàn diện FWD Care với quyền lợi nội trú lên đến 500tr/năm.`;
  }
}
