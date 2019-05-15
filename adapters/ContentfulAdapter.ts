import { IWork } from '@/entities/interfaces'

const contentful = require('contentful')

class ContentfulAdapter {
  config = {
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN
  }
  client: any

  createClient() {
    return contentful.createClient(this.config)
  }

  async fetchWorks(): Promise<IWork[]> {
    if (!this.client) this.client = this.createClient()
    const res = await this.client.getEntries({
      content_type: process.env.CTF_WORK_TYPE_ID,
      order: 'fields.order'
    })
    return res.items.map((item: any) => item.fields as IWork)
  }
}

export default new ContentfulAdapter()