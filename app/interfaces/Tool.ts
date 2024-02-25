interface Tool {
    fields: {
      id: string;
      name: string;
      logo: {
        fields: {
          file: {
            url: string;
          };
        };
      };
      image: {
        fields: {
          description: string;
        };
      };
      cardDescription: string;
      category: string;
      platform: string;
      tooltip: string;
      tags: string[];
    };
}