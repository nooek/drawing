export default class GetMatchUsecase {
  private matchDb: any;

  constructor(matchDb: any) {
    this.matchDb = matchDb;
  }

  async execute(method: string, matchParamToFind: string) {
    const methods: any = {
      "findByCreatorId": await this.matchDb.findByCreatorId(matchParamToFind),
      "findMatchInProgressByCreatorId": await this.matchDb.findMatchByStatusAndCreatorId(matchParamToFind, "in-progress"),
      "findMatchCreatedByCreatorId": await this.matchDb.findMatchByStatusAndCreatorId(matchParamToFind, "created")
    };
    const matchsFound = methods[method];
    console.log(matchsFound)
    if (!matchsFound) {
      return {
        statusCode: 200,
        body: {
          message: "No matchs found",
        },
      };
    }
    return {
      statusCode: 200,
      body: matchsFound,
    };
  }
}
